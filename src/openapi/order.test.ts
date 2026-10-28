import { expect, test } from "bun:test";
import { compareDeclarations } from "./compare";
import { preserveOrder } from "./order";

test("retains declaration, member and union order without restoring old types or docs", async () => {
	const baseline = `import type { Unused } from "./unused";
export type Choice = "a" | "b";
export interface Example {
  /** old documentation */
  first: string;
  second?: ("a" | "b")[];
}
export type Last = number;
`;
	const generated = `import type { Unused } from "./unused";
export interface NewType { value: boolean }
export type Last = number;
export interface Example {
  /** added field */
  added: true;
  second?: ("b" | "a" | "c")[];
  /** current documentation */
  first?: number;
}
export type Choice = "b" | "a" | "c";
`;
	const aligned = await preserveOrder(generated, baseline);
	expect(aligned.indexOf("type Choice")).toBeLessThan(
		aligned.indexOf("interface Example"),
	);
	expect(aligned.indexOf("interface Example")).toBeLessThan(
		aligned.indexOf("type Last"),
	);
	expect(aligned.indexOf("type Last")).toBeLessThan(
		aligned.indexOf("interface NewType"),
	);
	expect(aligned.indexOf("first?: number")).toBeLessThan(
		aligned.indexOf("second?:"),
	);
	expect(aligned.indexOf("second?:")).toBeLessThan(
		aligned.indexOf("added: true"),
	);
	expect(aligned).toContain('type Choice = "a" | "b" | "c"');
	expect(aligned).toContain('second?: ("a" | "b" | "c")[]');
	expect(aligned).toContain("current documentation");
	expect(aligned).not.toContain("old documentation");
	expect(
		compareDeclarations({ "types.d.ts": generated }, { "types.d.ts": aligned }),
	).toEqual({ added: [], removed: [], changed: [] });
	expect(await preserveOrder(aligned, aligned)).toBe(aligned);
});

test("keeps callable return unions ordered and preserves new optionality", async () => {
	const baseline =
		"export interface API { run: CallAPI<Params.Run, Message | true>; }";
	const generated =
		"export interface API { run?: CallAPI<Params.Run, true | Message | false>; }";
	const aligned = await preserveOrder(generated, baseline);
	expect(aligned).toContain(
		"run?: CallAPI<Params.Run, Message | true | false>",
	);
	expect(
		compareDeclarations({ "api.d.ts": generated }, { "api.d.ts": aligned })
			.changed,
	).toEqual([]);
});
