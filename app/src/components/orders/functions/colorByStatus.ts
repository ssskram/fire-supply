export default function colorByStatus(status) {
  if (status == "Order Submitted") {
    return "rgba(40, 167, 69, .2)";
  }
  if (status == "Approved") {
    return "rgba(23, 162, 184, .3)";
  }
  if (status == "Partially Approved") {
    return "rgba(23, 162, 184, .2)";
  }
  if (status == "Rejected") {
    return "rgba(220, 53, 69, .3)";
  }
  if (status == "Pending Higher Approval") {
    return "rgba(255, 193, 7, .2)";
  } else return "rgba(56, 56, 56, .2)";
}
