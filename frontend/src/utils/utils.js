
export function formatMessageTime(data) {
    const date = new Date(data);
    
    // Format time (AM/PM)
    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    
    const timeString = date.toLocaleTimeString("en-US", timeOptions);
    
    // Format date and day
    const dateOptions = {
      weekday: 'short', // 'short' gives abbreviated day (Mon, Tue, etc.)
      month: 'short',   // 'short' gives abbreviated month (Jan, Feb, etc.)
      day: 'numeric',   // Day of the month
    };
    
    const dateString = date.toLocaleDateString("en-US", dateOptions);
    
    return {
      time: timeString,
      date: dateString
    };
  }