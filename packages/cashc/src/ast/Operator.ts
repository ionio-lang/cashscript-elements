export enum UnaryOperator {
  NOT = '!',
  NEGATE = '-',
  SIZE = '.length',
  // TODO: enable again as soon we find how can be done with OP_SUBSTR, OP_SWAP and OP_CAT
  //REVERSE = '.reverse()',
}

export enum BinaryOperator {
  DIV = '/',
  MOD = '%',
  PLUS = '+',
  MINUS = '-',
  LT = '<',
  LE = '<=',
  GT = '>',
  GE = '>=',
  EQ = '==',
  NE = '!=',
  BIT_AND = '&',
  BIT_XOR = '^',
  BIT_OR = '|',
  AND = '&&',
  OR = '||',
  // TODO: enable again as soon we find how can be done with OP_SUBSTR
  //SPLIT = '.split',
  // Hint from Burak
  /* 
  <0xdata>
  OP_DUP
  <0>
  <n>
  OP_SUBSTR
  OP_SWAP
  <n>
  <999>
  OP_SUBSTR_LAZY 
  */

}
