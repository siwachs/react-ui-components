const deeplyNestedArray = [
  1,
  [
    2,
    [
      3,
      [
        4,
        [
          5,
          [
            6,
            [
              7,
              [
                8,
                [
                  9,
                  [
                    10,
                    [11, [12, [13, [14, [15, [16, [17, [18, [19, [20]]]]]]]]]],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
];

console.log("Array before flat", deeplyNestedArray);

// Using Arrow Function Here can't able to access context because they use defination scope not calling scope so regular function is used.
function flatten() {
  // Access because of closure and Lexical Scope
  const flattenArray = [];

  function processArr(arr) {
    for (const currentElement of arr) {
      if (Array.isArray(currentElement)) processArr(currentElement);
      else flattenArray.push(currentElement);
    }
  }

  processArr(this);

  return flattenArray;
}

function flattenOtherMethod() {
  return this.toString()
    .split(",")
    .map((el) => Number(el));
}
flattenOtherMethod();

Array.prototype.flatten = flattenOtherMethod;
Array.prototype.flatten = flatten;

// Call flatten in the context of deeplyNestedArray
console.log("Array after flat", deeplyNestedArray.flatten());
