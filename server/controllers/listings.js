
import Listing from '../models/Listing.js';
import ErrorResponse from '../utils/errorResponse.js';
import upload from '../config/upload.js';
import User from '../models/User.js';




// Create Listing Endpoint with Multer Middleware
export const createListing = async (req, res, next) => {
  try {
    console.log("thisis")
    // Handle file upload
    upload.array('images', 6)(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      
      // Collect image URLs
      const imageUrls = req.files ? req.files.map(file => `http://localhost:5000/uploads/${file.filename}`) : [];

      // Create listing document
      const listing = await Listing.create({
        imageUrls,
        ...req.body
      }
      );

      return res.status(201).json(listing);
    });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = (req, res) => {
  
  try {

    const imageUrls = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];
    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};


export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorResponse('Listing not found!', 404));
  }
  const admin = await User.findById(req.user.id)
  const isAdmin = admin.isAdmin


  if (req.user.id !== listing.userRef && !isAdmin ) {
    return next(new ErrorResponse('You can only delete your own listings!', 401));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorResponse('Listing not found!', 404));
  }
  const admin = await User.findById(req.user.id)
  const isAdmin = admin.isAdmin

  if (req.user.id !== listing.userRef && !isAdmin) {
    return next(new ErrorResponse('You can only update your own listings!', 401));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ErrorResponse('Listing not found!', 404));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      const totalPosts = await Listing.countDocuments();

      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Listing.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      return res.status(200).json({
        posts:listings,
        totalPosts,
        lastMonthPosts,
      });

    // return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
