import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../shared/styles/colors';
import * as Auth from '../../shared/ui/auth/Auth.styles';
import { AuthArt } from '../../shared/ui/auth/AuthArt';

interface ValidationStyleProps {
  $invalid?: boolean;
}

interface BarsProps {
  $complete: boolean;
}

export const Page = styled(Auth.Page)`
  max-width: 140rem;
  --signup-input-height: 48px;
  --signup-field-gap: 6px;
  --signup-form-gap: 20px;
  --signup-fields-gap: 16px;
  --signup-role-padding: 8px;
  --signup-heading-size: clamp(24px, 2.2vw, 28px);
  --signup-description-size: 14px;
  --signup-description-line: 22px;
  --signup-help-size: 13px;
  --signup-help-line: 20px;
  --signup-step-gap: 8px;
  --signup-progress-height: 4px;
  --signup-input-padding: 14px;
  --signup-icon-size: 20px;
  --signup-submit-height: 46px;
  --signup-submit-padding: 10px;

  @media (min-width: 761px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    --signup-input-size: 14px;
  }

  @media (min-width: 761px) and (max-height: 950px) {
    --signup-input-height: 44px;
    --signup-form-gap: clamp(12px, calc(4svh - 17px), 20px);
    --signup-fields-gap: clamp(10px, calc(4svh - 19px), 16px);
    --signup-panel-padding: 15px;
  }
`;

export const Art = styled(AuthArt)`
  @media (min-width: 761px) {
    justify-self: end;
  }
`;

export const Panel = styled(Auth.Panel)`
  padding-block: var(--signup-panel-padding, 32px);
`;

export const Form = styled(Auth.Form)`
  grid-template-columns: minmax(0, 1fr);
  gap: var(--signup-form-gap, 28px);
`;

export const Heading = styled(Auth.Heading)`
  & h1 {
    font-size: var(--signup-heading-size, clamp(26px, 2.35vw, 32px));
  }

  & p {
    font-size: var(--signup-description-size, 16px);
    line-height: var(--signup-description-line, 26px);
  }
`;

export const Fields = styled(Auth.Fields)`
  gap: var(--signup-fields-gap, 20px);
`;

export const Field = styled(Auth.Field)`
  grid-template-columns: minmax(0, 1fr);
  gap: var(--signup-field-gap);
`;

export const Step = styled.div`
  display: grid;
  gap: var(--signup-step-gap, 10px);
  color: ${colors.primary.normal};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.0071em;
`;

export const Bars = styled.div<BarsProps>`
  display: flex;
  gap: 8px;

  & span {
    flex: 1;
    height: var(--signup-progress-height, 6px);
    border-radius: 3px;
    background: ${({ $complete }) => ($complete ? colors.primary.normal : colors.fill.strong)};
  }

  & span:first-child {
    background: ${colors.primary.normal};
  }
`;

export const Roles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  padding: 4px;
  border-radius: 16px;
  background: ${colors.fill.normal};
`;

export const Role = styled(Link)`
  text-align: center;
  padding-block: var(--signup-role-padding, 12px);
  border-radius: 12px;
  color: ${colors.label.alternative};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.0071em;

  &[aria-current='page'] {
    color: ${colors.label.strong};
    background: ${colors.fill.raised};
  }
`;

export const ClassInfo = styled.div`
  display: grid;
  gap: var(--signup-field-gap);
`;

export const ClassRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(8px, 3%, 12px);
`;

export const InputBox = styled(Auth.InputBox)<ValidationStyleProps>`
  min-width: 0;
  min-height: var(--signup-input-height);
  padding-inline: var(--signup-input-padding, 18px);

  & > img,
  & > button img {
    width: var(--signup-icon-size, 24px);
    height: var(--signup-icon-size, 24px);
  }

  ${({ $invalid }) =>
    $invalid &&
    `
      &, &:focus-within {
        border-color: ${colors.status.negative};
        box-shadow: inset 0 0 0 1px ${colors.status.negative};
      }
    `}
`;

export const Input = styled(Auth.Input)`
  width: 100%;
  min-height: calc(var(--signup-input-height) - 2px);
  font-size: var(--signup-input-size, 16px);

  &[type='number'] {
    appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const Helper = styled.p<ValidationStyleProps>`
  color: ${({ $invalid }) => ($invalid ? colors.status.negative : colors.label.assistive)};
  font-size: var(--signup-help-size, 14px);
  font-weight: 400;
  line-height: var(--signup-help-line, 22px);
  letter-spacing: 0.0071em;
`;

export const Submit = styled(Auth.Submit)`
  min-height: var(--signup-submit-height, 52px);
  padding-block: var(--signup-submit-padding, calc(0.875rem - 1.5px));
`;
