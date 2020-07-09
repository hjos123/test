export class Product {
	constructor (
		public id: number,
		public name: string,
		public category: string,
		public description: string,
		public quantity: string,
		public date_available: string,
		public price: string,
		public path: string,
		public user_id: number
		){}
}