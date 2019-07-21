export default interface IRevision {
	modeId: string;
	changelog: string[];
	version: number;
	code: string;
	createdAt: Date;
	body: string;
}
