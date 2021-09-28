import {
  BytesType,
  encodeInt,
  Op,
  PrimitiveType,
  Script,
  Type,
} from '../../../utils';
import { UnaryOperator, BinaryOperator } from '../ast/Operator';
import { GlobalFunction, TimeOp } from '../ast/Globals';

export function compileTimeOp(op: TimeOp): Script {
  const mapping = {
    [TimeOp.CHECK_LOCKTIME]: [Op.OP_CHECKLOCKTIMEVERIFY, Op.OP_DROP],
    [TimeOp.CHECK_SEQUENCE]: [Op.OP_CHECKSEQUENCEVERIFY, Op.OP_DROP],
  };

  return mapping[op];
}

export function compileCast(from: Type, to: Type): Script {
  
  // TODO enable againg when we sort out OP_SPLIT in elements
  /* if (from === PrimitiveType.INT && to instanceof BytesType && to.bound !== undefined) {
    return [encodeInt(to.bound), Op.OP_NUM2BIN];
  }

  if (from !== PrimitiveType.INT && to === PrimitiveType.INT) {
    return [Op.OP_BIN2NUM];
  }

  if (from === PrimitiveType.SIG && to === PrimitiveType.DATASIG) {
    return [Op.OP_SIZE, encodeInt(1), Op.OP_SUB, Op.OP_SPLIT, Op.OP_DROP];
  } */

  return [];
}

export function compileGlobalFunction(fn: GlobalFunction): Script {
  const mapping = {
    [GlobalFunction.ABS]: [Op.OP_ABS],
    [GlobalFunction.CHECKSIGFROMSTACK]: [Op.OP_CHECKSIGFROMSTACK],
    [GlobalFunction.CHECKMULTISIG]: [Op.OP_CHECKMULTISIG],
    [GlobalFunction.CHECKSIG]: [Op.OP_CHECKSIG],
    [GlobalFunction.MAX]: [Op.OP_MAX],
    [GlobalFunction.MIN]: [Op.OP_MIN],
    [GlobalFunction.RIPEMD160]: [Op.OP_RIPEMD160],
    [GlobalFunction.SHA1]: [Op.OP_SHA1],
    [GlobalFunction.SHA256]: [Op.OP_SHA256],
    [GlobalFunction.HASH160]: [Op.OP_HASH160],
    [GlobalFunction.HASH256]: [Op.OP_HASH256],
    [GlobalFunction.WITHIN]: [Op.OP_WITHIN],
  };

  return mapping[fn];
}

export function compileBinaryOp(op: BinaryOperator, numeric: boolean = false): Script {
  const mapping: { [key in BinaryOperator]: Script } = {
    [BinaryOperator.DIV]: [Op.OP_DIV],
    [BinaryOperator.MOD]: [Op.OP_MOD],
    [BinaryOperator.PLUS]: [Op.OP_CAT],
    [BinaryOperator.MINUS]: [Op.OP_SUB],
    [BinaryOperator.LT]: [Op.OP_LESSTHAN],
    [BinaryOperator.LE]: [Op.OP_LESSTHANOREQUAL],
    [BinaryOperator.GT]: [Op.OP_GREATERTHAN],
    [BinaryOperator.GE]: [Op.OP_GREATERTHANOREQUAL],
    [BinaryOperator.EQ]: [Op.OP_EQUAL],
    [BinaryOperator.NE]: [Op.OP_EQUAL, Op.OP_NOT],
    [BinaryOperator.AND]: [Op.OP_BOOLAND],
    [BinaryOperator.OR]: [Op.OP_BOOLOR],
    [BinaryOperator.BIT_AND]: [Op.OP_AND],
    [BinaryOperator.BIT_OR]: [Op.OP_OR],
    [BinaryOperator.BIT_XOR]: [Op.OP_XOR],
    //[BinaryOperator.SPLIT]: [Op.OP_SPLIT],
  };

  if (numeric) {
    mapping[BinaryOperator.PLUS] = [Op.OP_ADD];
    mapping[BinaryOperator.EQ] = [Op.OP_NUMEQUAL];
    mapping[BinaryOperator.NE] = [Op.OP_NUMNOTEQUAL];
  }

  return mapping[op];
}

export function compileUnaryOp(op: UnaryOperator): Op[] {
  const mapping = {
    [UnaryOperator.NOT]: [Op.OP_NOT],
    [UnaryOperator.NEGATE]: [Op.OP_NEGATE],
    [UnaryOperator.SIZE]: [Op.OP_SIZE, Op.OP_NIP],
    //[UnaryOperator.REVERSE]: [Op.OP_REVERSEBYTES],
  };

  return mapping[op];
}
