import { Types } from 'mongoose';

export const mergeUniqueIds = (
  existingIds: Types.ObjectId[],
  newId: Types.ObjectId,
): Types.ObjectId[] => {
  return Array.from(
    new Set([...existingIds.map((id) => id.toString()), newId.toString()]),
  ).map((id) => new Types.ObjectId(id));
};
