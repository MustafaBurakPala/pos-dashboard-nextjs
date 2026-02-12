import mongoose, { Schema, models, model } from "mongoose";

const AuditLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },

    action: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE", "LOGIN"],
    },

    entity: { type: String, required: true }, // Product, Order vs
    entityId: { type: String },

    metadata: { type: Object },

    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true, // 🔥 createdAt ve updatedAt otomatik gelir
  },
);

export default models.AuditLog || model("AuditLog", AuditLogSchema);
