class DefaultCalculator {
  binaryOperation(
    {
      operator,
      firstOperand,
      secondOperand
    }: BinaryOperationParameters): Result {
    switch (operator) {
      case '*':
        return { value: firstOperand * secondOperand };
      case '+':
        return { value: firstOperand + secondOperand };
      case '-':
        return { value: firstOperand - secondOperand };
      case '/':
        if (secondOperand === 0) {
          throw Error('Second Operation on Division Cannot be null');
        }
        return { value: firstOperand / secondOperand };

    }
  }
}

interface Result {
  value: number;
}

interface BinaryOperationParameters {
  operator: Operators;
  firstOperand: number;
  secondOperand: number;
}


type Operators = '+' | '-' | '*' | '/' | '%' | '^';

interface BinaryOperationOperands {
  firstOperand: number;
  secondOperand: number;
}

interface BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result;
}

class Sum implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    return { value: firstOperand + secondOperand };
  }
}

class Subtraction implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    return { value: firstOperand - secondOperand };
  }
}

class Multiplication implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    return { value: firstOperand * secondOperand };
  }
}

class Division implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    if (!secondOperand) {
      throw Error('Second Operand Cannot be 0 on division');
    }
    return { value: firstOperand / secondOperand };
  }
}

class Pow implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    return {
      value: firstOperand ** secondOperand,
    }
  }
}

class Percent implements BinaryOperationStrategy {
  calculate({ firstOperand, secondOperand }: BinaryOperationOperands): Result {
    return {
      value: firstOperand * (secondOperand / 100),
    }
  }
}

class ContextAnalyzer {
  getInstance(operator: Operators): BinaryOperationStrategy {
    switch (operator) {
      case '*':
        return new Multiplication();
      case '+':
        return new Sum();
      case '-':
        return new Subtraction();
      case '/':
        return new Division();
      case '%':
        return new Percent();
      case '^':
        return new Pow();

    }
  }
}

class Calculator {
  constructor(
    private readonly contextAnalyzer: ContextAnalyzer
  ) { }
  /**
   * Note, a implementação do metodo call na classe Calculator, não vai muda
   * tão pouco as funcionalidades dentro de cada uma das operações.
   * A unica coisa que realmente será mutavel, vai ser a classe ContextAnalyzer que 
   * adicionará um novo case a cada operaçõa adicionada :D
   */
  call({ operator, firstOperand, secondOperand }: BinaryOperationParameters): Result {

    return this.contextAnalyzer.getInstance(operator).calculate({ firstOperand, secondOperand });
  }
}


