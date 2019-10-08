import {Permission} from "./permission";
export class Group {
	id: number;
	name: string;
	description: string;
	permissions: Array<Permission> = [];
	status: number;
	created_at: Date;
	updated_at: Date;

}
