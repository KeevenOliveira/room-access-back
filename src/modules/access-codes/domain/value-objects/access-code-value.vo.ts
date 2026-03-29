import { InvalidArgumentError } from '@core/domain/errors/domain.error';
import { ValueObject } from '@core/domain/value-objects/value-object';

interface AccessCodeValueProps {
  value: string;
}

export class AccessCodeValue extends ValueObject<AccessCodeValueProps> {
  private static readonly PATTERN = /^[A-Z0-9]{9}$/;

  private constructor(props: AccessCodeValueProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(code: string): AccessCodeValue {
    if (!AccessCodeValue.PATTERN.test(code)) {
      throw new InvalidArgumentError(
        'Access code must be exactly 9 uppercase alphanumeric characters.',
      );
    }
    return new AccessCodeValue({ value: code });
  }
}
