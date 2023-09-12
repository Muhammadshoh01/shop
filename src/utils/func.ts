const addZero = (num: number): string => {
	return num < 10 ? `0${num}` : num.toString()
}

export const convertDate = (date: Date): string => {
	if (!date) return ''
	let data = new Date(date)
	return `${addZero(data.getHours())}:${addZero(data.getMinutes())} ${addZero(
		data.getDate()
	)}/${addZero(data.getMonth() + 1)}/${data.getFullYear()}`
}
