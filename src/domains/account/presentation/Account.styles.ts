import styled from '@emotion/styled';
import { Button } from '../../../shared/ui/Button';
import { colors } from '../../../shared/styles/colors';

export const Profile = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 600fr) minmax(0, 724fr);
  align-items: start;
  gap: 2.5rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
export const Cover = styled.div`
  position: relative;
  height: 17.5rem;
  overflow: hidden;
  border: 0.1875rem dashed ${colors.label.assistive};
  border-radius: 1.5rem;
  background: ${colors.fill.normal};
  > img {
    position: absolute;
    width: 15rem;
    height: 15rem;
    left: 50%;
    bottom: -1.5rem;
    transform: translateX(-50%);
    object-fit: cover;
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    height: 210px;
    > img {
      width: 180px;
      height: 180px;
      bottom: -18px;
    }
  }
`;
export const Edit = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: ${colors.fill.normal};
  img {
    width: 1.625rem;
    height: 1.625rem;
  }
  &:hover {
    background: ${colors.fill.strong};
  }
  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }
`;
export const Info = styled.div`
  min-width: 0;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  h2 {
    margin-bottom: 0.625rem;
    font-size: 2rem;
    line-height: 2.625rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  dl {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    font-size: 1rem;
    line-height: 1.625rem;
  }
  dt {
    color: ${colors.label.neutral};
  }
  dd {
    margin: 0.125rem 0 0;
    color: ${colors.label.assistive};
  }
  dd > div {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.375rem;
    overflow-wrap: anywhere;
  }
  @media (max-width: 700px) {
    padding-top: 0;
  }
`;
export const Friends = styled.p`
  align-self: flex-start;
  color: ${colors.primary.normal};
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
`;
export const Rank = styled.section`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.static.black};
  > img {
    flex-shrink: 0;
    width: 10.5rem;
    height: 12.25rem;
  }
  @media (max-width: 600px) {
    padding: 20px 0;
    gap: 16px;
    > img {
      width: 72px;
      height: 84px;
    }
  }
`;
export const Progress = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  h2 {
    color: ${colors.label.neutral};
    font-size: 1.5rem;
    line-height: 2rem;
  }
  h3 {
    font-size: 2rem;
    line-height: 2.625rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  p {
    color: ${colors.label.alternative};
    font-size: 1rem;
    line-height: 1.625rem;
  }
  > img {
    display: block;
    width: 100%;
    height: auto;
  }
  @media (max-width: 600px) {
    h2 {
      font-size: 18px;
      line-height: 26px;
    }
    h3 {
      font-size: 24px;
      line-height: 32px;
    }
    p {
      font-size: 13px;
      line-height: 22px;
    }
  }
`;
export const Values = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: ${colors.label.assistive};
  font-size: 1rem;
  line-height: 1.625rem;
  strong {
    color: ${colors.label.neutral};
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
export const Logout = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  border-radius: 1rem;
  > img {
    width: 1.625rem;
    height: 1.625rem;
  }
  > div {
    min-width: 0;
    flex: 1;
  }
  h2 {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
  p {
    margin-top: 0.25rem;
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    padding: 16px 0;
    > button {
      margin-left: auto;
    }
  }
`;
export const Exit = styled(Button)`
  flex-shrink: 0;
  min-height: 3.25rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.875rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colors.static.black};
  box-shadow: 0 0.25rem ${colors.status.negativeHeavy};
`;
