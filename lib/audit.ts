import AuditLog from "@/lib/models/AuditLog";

export async function createAuditLog({
  user,
  action,
  entity,
  entityId,
  metadata,
  req,
}: {
  user: { id?: string; email?: string } | any;
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN";
  entity: string;
  entityId?: string;
  metadata?: any;
  req?: Request;
}) {
  const ipAddress =
    req?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req?.headers.get("x-real-ip") ||
    undefined;

  const userAgent = req?.headers.get("user-agent") || undefined;

  await AuditLog.create({
    userId: user?.id || user?._id?.toString() || "unknown",
    userEmail: user?.email || "unknown",
    action,
    entity,
    entityId,
    metadata,
    ipAddress,
    userAgent,
  });
}
