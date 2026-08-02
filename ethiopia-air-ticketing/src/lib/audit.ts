import { prisma } from "./prisma";

export async function logAuditAction(
  action: "CREATE" | "UPDATE" | "DELETE",
  entity: string,
  entityId: string,
  details: string,
  userId: string
) {
  try {
    if (!userId) return; // Prevent crash if missing
    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        details,
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to log audit action:", error);
  }
}
