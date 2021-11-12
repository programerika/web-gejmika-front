/**
 * @author Programerika
 */

export default function notifyError(
  error,
  alertUser = false,
  userMessage,
  appendReason = false
) {
  if (alertUser) {
    const finalMessage =
      userMessage + (appendReason ? " Reason: " + error.message : "");
    window.alert(finalMessage);
  }
  console.error(error);
}
