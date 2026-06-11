import { describe, expect, it } from "vitest";
import { getAgeLabel } from "./ratings";

describe("getAgeLabel", () => {
    it("returns a simple label for TV-MA rating", () => {
        expect(getAgeLabel("TV-MA")).toBe("Adults");
    });
});