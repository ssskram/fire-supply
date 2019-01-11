export default function colorByStatus(status) {
    if (status == "Order Submitted") {
        return '#28a745' 
    }
    if (status == "Approved") {
        return '#17a2b8'
    }
    if (status == "Rejected") {
        return '#dc3545'
    }
    if (status == "Pending Higher Approval") {
        return '#ffc107'
    }
    else return 'rgba(56, 56, 56, .8)' 
}