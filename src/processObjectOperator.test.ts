import { processObjectOperator } from "./processObjectOperator";

describe("processObjectOperator", () => {
    test("different nested levels", () => {
      expect(processObjectOperator({ prop: "ciao" }, "prop")).toEqual(
        "ciao"
      );
      expect(
        processObjectOperator(
          { prop: { test: { id: "ciao" } } },
          "prop.test.id"
        )
      ).toEqual("ciao");
      expect(
        processObjectOperator(
          { "prop.test": { id: "ciao" } },
          "prop.test.id"
        )
      ).toEqual("ciao");
    });

    test('no match found', () => {
      expect(processObjectOperator({}, 'pro')).toEqual(undefined);
      expect(processObjectOperator({ prop: "ciao" }, "pro")).toEqual(undefined);
      expect(processObjectOperator({ prop: { test: { id: "ciao" } } }, "prop.tes")).toEqual(undefined);
      expect(processObjectOperator({ prop: { test: { id: "ciao" } } }, "prop.test.i")).toEqual(undefined);
      expect(processObjectOperator({ prop: { test: { id: { test: "ciao" } } } }, "prop.test.id.tes")).toEqual(undefined);
      expect(
        processObjectOperator(
          { "prop.test": { id: "ciao" } },
          "prop.test.i"
          )
        ).toEqual(undefined);
    });
  });