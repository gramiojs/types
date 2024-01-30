export type TObjectType = "object" | "method";

export namespace IBotApi {
	export interface ISchema {
		methods: IMethod[];
		objects: IObject[];
		recent_changes: IRecentChangesObject;
		version: IVersion;
	}

	export interface IMethod {
		arguments?: IArgument[] | null;
		description: string;
		documentation_link: string;
		multipart_only: boolean;
		name: string;
		return_type: IArgument;
	}

	export interface IArgument {
		description: string;
		name: string;
		required: boolean;
		default?: boolean | number | null | string;
		max?: number | null;
		min?: number | null;
		type: IType;
		enumeration?: string[] | null;
		max_len?: number | null;
		min_len?: number | null;
		any_of?: IArgument[] | null;
		reference?: string;
		array?: IArgument;
	}

	export type IType =
		| "integer"
		| "string"
		| "bool"
		| "float"
		| "any_of"
		| "reference"
		| "array";

	export interface IObject {
		description: string;
		documentation_link: string;
		name: string;
		properties?: IProperty[];
		type?: string;
		any_of?: IArgument[];
	}

	export interface IProperty {
		description: string;
		name: string;
		required: boolean;
		default?: boolean | number | null | string;
		max?: number | null;
		min?: number | null;
		type: IType;
		enumeration?: string[] | null;
		max_len?: number | null;
		min_len?: number | null;
		any_of?: IArgument[] | null;
		reference?: string;
		array?: IArgument;
	}

	export interface IRecentChangesObject {
		day: number;
		month: number;
		year: number;
	}

	export interface IVersion {
		major: number;
		minor: number;
		patch: number;
	}
}
