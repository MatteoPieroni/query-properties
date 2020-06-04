import stringToObjectProperty from "./index";

const simpleObject = {
  prop: "test"
};

const simpleArray = ["test 1", "test 2"];

const complexArray = {
  array: [['test 1', 'test 2'], 'test', ['test 3', [[ 'test 4'], 'test 5' ]]]
};

const complexObject = {
  prop1: {
    prop: "salut"
  },
  prop2: [
    {
      prop: "ciao"
    },
    {
      prop: "hello"
    }
  ]
};

const superComplexObject = {
  "ciao.comp": {
    prop: "salut"
  },
  happy: {
    arr: [
      {
        prop: "test"
      }
    ]
  },
  prop2: [
    {
      prop: [
        1,
        {
          prop: "what's . up"
        }
      ]
    },
    {
      prop: "hello"
    }
  ]
};

describe("stringToObjectProperty", () => {

  describe('direct properties', () => {
    test("should access direct properties", () => {
      expect(stringToObjectProperty(simpleObject, "prop")).toEqual("test");
    });
  })

  describe('arrays', () => {
    test("should access array indexes", () => {
        expect(stringToObjectProperty(simpleArray, "[1]")).toEqual("test 2");
    });

    test("should access complex arrays", () => {
      expect(stringToObjectProperty(complexArray, "array[0][1]")).toEqual("test 2");
    });

    test('should return null for non-found properties', () => {
      expect(stringToObjectProperty(simpleArray, '[3]')).toEqual(null);
      expect(stringToObjectProperty(complexArray, 'array[0][3]')).toEqual(null);
    });
  })

  describe('objects', () => {
    test("should access object indexes", () => {
      expect(stringToObjectProperty(complexObject, "prop1.prop")).toEqual(
        "salut"
      );
    });

    test('should return null for non-found properties', () => {
      expect(stringToObjectProperty(complexObject, 'pro')).toEqual(null);
      expect(stringToObjectProperty(complexObject, 'prop1.prop.p')).toEqual(null);
      expect(stringToObjectProperty(complexObject, 'prop1.prop2')).toEqual(null);
      expect(stringToObjectProperty(complexObject, 'prop1.prop.prop3')).toEqual(null);
      expect(stringToObjectProperty(complexObject, 'prop1.prop2.prop3')).toEqual(null);
    });
  });

  describe('mixed', () => {
    test("should access mixed objects", () => {
      expect(stringToObjectProperty(complexObject, "prop2[1].prop")).toEqual(
        "hello"
      );
      expect(stringToObjectProperty(complexObject, "prop2[0].prop")).toEqual(
        "ciao"
      );
      expect(
        stringToObjectProperty(superComplexObject, "ciao.comp.prop")
      ).toEqual("salut");
      expect(
        stringToObjectProperty(superComplexObject, "happy.arr[0].prop")
      ).toEqual("test");
      expect(
        stringToObjectProperty(superComplexObject, "prop2[0].prop[0]")
      ).toEqual(1);
      expect(
        stringToObjectProperty(superComplexObject, "prop2[0].prop[1]")
      ).toEqual({ prop: "what's . up" });
      expect(stringToObjectProperty(superComplexObject, "prop2[1].prop")).toEqual(
        "hello"
      );
    });

    test('should return null for non-found properties', () => {
      expect(stringToObjectProperty(superComplexObject, 'ciao.comp.pro')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'happy.arr[0].pro')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'happy.arr[1]')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'happy.arr[1].pro')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'prop20[0].prop[0]')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'prop2[0].prop[4]')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'prop2[0].prop[0].prop')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'prop2[1].pro')).toEqual(null);
      expect(stringToObjectProperty(superComplexObject, 'prop2[1].prop[4]')).toEqual(null);
    });
  });
});

