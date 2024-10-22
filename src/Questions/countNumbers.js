// implement a function that returns the count of numbers in a provided array.
// The array might contain other data types and nested arrays too.

const deeplyNestedArray = [
  1,
  function () {},
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
                    [
                      11,
                      "String",
                      [12, [13, [14, [15, [16, [17, [18, [19, [20]]]]]]]]],
                    ],
                  ],
                ],
                "New String",
                {},
              ],
            ],
            function () {},
          ],
        ],
      ],
    ],
  ],
];

function getCount(collection) {
  let count = 0;

  // Unnecessary Check
  if (!collection.length) return 0;

  for (const currentElement of collection) {
    if (typeof currentElement === "number") count += currentElement;
    else if (Array.isArray(currentElement)) count += getCount(currentElement);
  }

  return count;
}

console.log(getCount(deeplyNestedArray));
