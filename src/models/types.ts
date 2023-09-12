export interface Category {
	id?: number
	title: string
	status: boolean
}

export interface Param {
	id?: number
	title: string
	category: number | ''
	status: boolean
}

export interface ProductParam {
	id: number // param.id
	title: string
	value: string
}

export interface Product {
	id?: number
	title: string
	price: number
	quantity: number
	category: number | null
	params: Param[]
	description?: string
	createdAt: Date
	img: string
	status: boolean
}

export interface Sale {
	id?: number
	product: number
	date: Date
	quantity: number
}
