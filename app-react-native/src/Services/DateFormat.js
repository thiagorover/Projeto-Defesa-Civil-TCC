const DateFormat = date => {
  let d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

export default DateFormat
