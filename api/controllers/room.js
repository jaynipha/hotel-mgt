
import { RoomModel } from '../models/room.js';
import { RoomTypeModel } from '../models/room-type.js';




/** GET HTTPS */
/**
 *  Get all rooms
 */
export const getRoombySearchAndFilter = async (req, res) => {
	const { search, roomType, minPrice, maxPrice } = req.query;

	try {
		const searchQuery = search || '';
		const roomTypeQuery = roomType || '';
		const minPriceQuery = minPrice || 0;
		const maxPriceQuery = maxPrice || Number.MAX_SAFE_INTEGER;

		// Define the filter to be used in the query
		const filter = {
			$and: [
				{
					$or: [
						{ name: { $regex: searchQuery, $options: 'i' } },
					]
				},
				{ roomType: roomTypeQuery },
				{ price: { $gte: minPriceQuery, $lte: maxPriceQuery } }
			]
		};


		const filteredRoomData = await RoomModel.find(filter);

		return res.status(200).send({ status: true, data: filteredRoomData });
	} catch (error) {
		return res.status(404).json(error.message);
	}
};
/**
 *  Get singleroom by id
 */
export const findRoomById = async (req, res) => {
	const id = req.params.id;
	await RoomModel.findById(id, (err, rooms) => {
		if (err) return res.status(404).json({ message: err.message });
		return res.status(200).json({ rooms: rooms });
	});
};
/**
 *  Get room by type
 */
export const getRoomType = async (req, res) => {

	const { page, pageSize } = req.query;

	if (page <= 0 || pageSize <= 0) {
		return res.status(400).json({
			status: false,
			message: "Invalid page number, should start with 1",
		});
	}
	const skipEqn = pageSize * (page - 1);

	try {
		const allRoomTypes = await RoomTypeModel.find().skip(skipEqn).limit(+pageSize);

		return res.status(200).send({ status: true, data: allRoomTypes });
	} catch (error) {
		return res.status(404).json(error.message);
	}
}

//-----------------------------------------------------

/** POST HTTPS */

/**
 *  Creating room-type
 */

export const createRoomType = async (req, res) => {
	const { name } = req.body;

	try {
		const newRoomType = new RoomTypeModel({ name });
		await newRoomType.save();
		return res.status(201).send({ status: true, data: newRoomType });
	} catch (error) {
		return res.status(404).json(error.message);
	}
}

/**
 *  Creating room
 */
export const createRoom = async (req, res) => {
	const { name, roomType, price } = req.body;

	try {
		const createRoom = new RoomModel({
			name, roomType, price
		});

		await createRoom.save();
		return res.status(201).send({ status: true, data: createRoom });
	} catch (err) {
		return res.status(404).json(err.message);
	}
}
//------------------------------------------------------
/** PUT HTTPS */

/**
 *  Updating room by type
 */
export const updateRoomById = async (req, res) => {
	const data = req.body;
	const { roomId } = req.params;

	try {

		await RoomModel.findByIdAndUpdate(roomId, data);

		return res.status(200).send({ status: true, message: "Rooms Updated Succesfully" });
	} catch (error) {
		return res.status(404).json(err.message);
	}
};
//------------------------------------------------------
/** DELETE HTTPS */

/**
 *  Delete RoomModel by id
 */
export const deleteRoomById = async (req, res) => {
	const { roomId } = req.params;
	try {

		await RoomModel.findByIdAndDelete(roomId);

		return res.status(200).send({ status: true, message: `Room with ${roomId} successfully deleted !!` });
	} catch (error) {
		return res.status(404).json(error.message);
	}
};


/**
 *  Delete RoomTypeModel by id
 */
export const deleteRoomTypeById = async (req, res) => {
	const { roomTypeId } = req.params;
	try {

		const checkExistingRoomType = await RoomTypeModel.findOne({ _id: roomTypeId });

		if (checkExistingRoomType === null) {
			return res.status(400).json({
				status: false,
				message: "Room Type not found",
			})
		}
		await RoomTypeModel.findByIdAndDelete(roomTypeId);

		return res.status(200).send({ status: true, message: `Room Type with ${roomTypeId} successfully deleted !!` });
	} catch (error) {
		return res.status(404).send({status: false, message: error.message});
	}
};

export const updateRoomTypeById = async (req, res) => {
	const data = req.body;
	const { roomTypeId } = req.params;

	try {
		const checkExistingRoomType = await RoomTypeModel.findOne({ _id: roomTypeId });

		if (checkExistingRoomType === null) {
			return res.status(400).json({
				status: false,
				message: "Room Type not found",
			})
		}

		await RoomTypeModel.findByIdAndUpdate(roomTypeId, data);

		return res.status(200).send({ status: true, message: "Room Type Updated Succesfully" });
	} catch (error) {
		return res.status(404).send({status: false, message: error.message});
	}
};