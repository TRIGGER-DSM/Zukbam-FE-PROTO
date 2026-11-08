import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../styles/colors';
import { Button } from '../Button';

const badgePositions = {
  java: { x: 66.7, y: 32 },
  c: { x: 22.2, y: 34.2 },
  python: { x: 7.4, y: 47.2 },
  cpp: { x: 45.6, y: 40 },
  javascript: { x: 71.5, y: 48.2 },
};

export type BadgePosition = keyof typeof badgePositions;

interface BadgeProps {
  $position: BadgePosition;
}

interface BadgeIconProps {
  $narrow: boolean;
}

export const Page = styled.main`
  --gutter: var(--page-gutter);
  display: grid;
  grid-template-columns: minmax(0, 13fr) minmax(0, 11fr);
  align-items: center;
  max-width: 112rem;
  margin-inline: auto;
  min-height: 100svh;
  background: ${colors.background.normal};

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    align-content: center;
    padding-block: 28px;
  }
`;

export const Art = styled.aside`
  position: relative;
  container-type: inline-size;
  aspect-ratio: 1;
  width: min(calc(100% - var(--gutter)), max(24rem, calc(100svh - 2 * var(--gutter))));
  justify-self: center;
  margin-block: var(--gutter);
  overflow: hidden;
  border-radius: clamp(1.25rem, 2vw, 2rem);
  background: ${colors.banner.pickBg};

  @media (max-width: 760px) {
    display: grid;
    place-items: center;
    aspect-ratio: auto;
    width: min(440px, 100% - 2 * var(--gutter));
    margin: 0 auto;
    padding: 24px;
  }
`;

export const Brand = styled(Link)`
  position: relative;
  display: block;
  width: 48%;
  margin: 12% auto 0;

  & img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 760px) {
    width: min(180px, 75%);
    margin: 0;
  }
`;

export const Tagline = styled.p`
  width: 70%;
  margin: 3.6% auto 0;
  color: ${colors.static.white};
  font-size: 3.2cqw;
  font-weight: 900;
  line-height: 1.3125;
  letter-spacing: -0.025em;
  text-align: center;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const Mascot = styled.img`
  position: absolute;
  top: 52%;
  left: 15%;
  width: 70%;
  height: auto;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const Badge = styled.div<BadgeProps>`
  position: absolute;
  top: ${({ $position }) => badgePositions[$position].y}%;
  left: ${({ $position }) => badgePositions[$position].x}%;
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  padding: 1.4cqw 2.8cqw 1.4cqw 1.4cqw;
  border-radius: 3.8cqw;
  background: ${colors.static.white};
  color: ${colors.static.black};
  box-shadow: 0 1.2cqw 3.2cqw rgba(26, 30, 112, 0.35);
  font-size: 2.4cqw;
  font-weight: 700;
  line-height: 1.3333;
  letter-spacing: -0.0167em;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const BadgeMark = styled.span`
  display: grid;
  place-items: center;
  width: 4.8cqw;
  height: 4.8cqw;
`;

export const BadgeIcon = styled.img<BadgeIconProps>`
  width: ${({ $narrow }) => ($narrow ? '4cqw' : '4.4cqw')};
  height: auto;
`;

export const Panel = styled.section`
  display: grid;
  justify-items: center;
  padding: 32px var(--gutter);
`;

export const Form = styled.form`
  display: grid;
  gap: 28px;
  width: min(100%, 440px);
`;

export const Heading = styled.header`
  display: grid;
  gap: 10px;

  & h1 {
    margin: 0;
    color: ${colors.label.strong};
    font-size: clamp(26px, 2.35vw, 32px);
    font-weight: 900;
    line-height: 1.3125;
    letter-spacing: -0.025em;
  }

  & p {
    color: ${colors.label.alternative};
    font-size: 16px;
    line-height: 26px;
  }
`;

export const Fields = styled.div`
  display: grid;
  gap: 20px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
  color: ${colors.label.normal};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.0071em;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding-inline: 18px;
  border: 1px solid ${colors.line.normal};
  border-radius: 14px;
  background: ${colors.background.alternative};

  &:focus-within {
    border-color: ${colors.primary.normal};
    box-shadow: inset 0 0 0 1px ${colors.primary.normal};
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  min-height: 54px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${colors.label.strong};
  font: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  outline: none;

  &::placeholder {
    color: ${colors.label.alternative};
  }
`;

export const Visibility = styled.button`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;

  &[aria-pressed='true'] img {
    filter: brightness(1.55);
  }
`;

export const Submit = styled(Button)`
  min-height: 52px;
  border-radius: 14px;
  color: ${colors.static.white};
  font-size: 16px;
  box-shadow: 0 4px 0 ${colors.primary.heavy};
`;

export const Switch = styled.p`
  display: flex;
  justify-content: center;
  gap: 8px;
  color: ${colors.label.alternative};
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.0071em;
`;

export const SwitchLink = styled(Link)`
  color: ${colors.primary.normal};
  font-weight: 700;
`;
