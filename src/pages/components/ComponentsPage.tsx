import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button, type ButtonState, type ButtonVariant } from '../../shared/ui/Button';
import { StatusBadge, type Relationship } from '../../shared/ui/StatusBadge';
import { ProgressBar } from '../../shared/ui/ProgressBar';
import { BambooProgress } from '../../shared/ui/BambooProgress';
import { Avatar } from '../../shared/ui/Avatar';
import { RangeSlider } from '../../shared/ui/RangeSlider';
import { AppFooter, AppHeader } from '../../shared/ui/SiteLayout';
import { difficulties } from '../../domains/problem/domain/problem';
import { DifficultyChip } from '../../domains/problem/presentation/DifficultyChip';
import { ProfileCard } from '../../domains/member/presentation/ProfileCard';
import { memberFixture } from '../../domains/member/infrastructure/memberFixture';
import { HomeBanner } from '../home/components/BannerCarousel';
import * as S from './ComponentsPage.styles';

const variants: ButtonVariant[] = ['primary', 'secondary', 'danger'];

const states: (ButtonState | 'disabled')[] = ['default', 'hover', 'active', 'focus', 'disabled'];

const statuses: Relationship[] = ['accepted', 'rejected', 'sent', 'friend'];

export default function ComponentsPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [notice, setNotice] = useState('');
  const notify = (label: string) => setNotice(`${label} 버튼을 눌렀습니다.`);
  return (
    <S.Root>
      <S.Main id="main">
        <h1>죽빰 컴포넌트</h1>
        <Link to="/components/colors">컬러 시스템 보기 →</Link>
        <S.Section aria-labelledby="buttons">
          <h2 id="buttons">Button</h2>
          <S.Panel>
            <S.Scroll>
              <S.Table>
                <thead>
                  <tr>
                    <th scope="col">Type / State</th>
                    {states.map((state) => (
                      <th scope="col" key={state}>
                        {state}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant}>
                      <th scope="row">{variant}</th>
                      {states.map((state) => (
                        <td key={state}>
                          <Button
                            variant={variant}
                            disabled={state === 'disabled'}
                            previewState={state === 'disabled' ? 'default' : state}
                            onClick={() => notify(`${variant} ${state}`)}
                          >
                            버튼
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.Scroll>
            <S.Notice role="status">{notice}</S.Notice>
          </S.Panel>
        </S.Section>
        <S.Section>
          <h2>Status Button</h2>
          <S.Row>
            {statuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </S.Row>
        </S.Section>
        <S.Section>
          <h2>Progress Bar</h2>
          <S.Panel>
            <S.Progress>
              <span>Value</span>
              <span>Large</span>
              <span>Small</span>
              {Array.from({ length: 11 }, (_, index) => index * 10).map((value) => (
                <Fragment key={value}>
                  <span>{value}%</span>
                  <ProgressBar value={value} label="20 / 30" name={`큰 진행 바 ${value}%`} />
                  <ProgressBar
                    value={value}
                    size="small"
                    label="20 / 30"
                    name={`작은 진행 바 ${value}%`}
                  />
                </Fragment>
              ))}
            </S.Progress>
          </S.Panel>
        </S.Section>
        <S.Section>
          <h2>Bamboo Progress</h2>
          <S.Panel>
            <BambooProgress />
          </S.Panel>
        </S.Section>
        <S.Section>
          <h2>Difficulty Chip</h2>
          <S.Row>
            {difficulties.map((item) => (
              <DifficultyChip key={item.id} level={item.id} />
            ))}
          </S.Row>
        </S.Section>
        <S.Section>
          <h2>App Header</h2>
          <S.Headers>
            {['홈', '문제', '랭킹', '소셜'].map((active) => (
              <AppHeader key={active} active={active} />
            ))}
          </S.Headers>
        </S.Section>
        <S.Section>
          <h2>Footer</h2>
          <S.Panel>
            <AppFooter />
          </S.Panel>
        </S.Section>
        <S.Section>
          <h2>Home Banner</h2>
          {(['recommend', 'hot', 'live'] as const).map((variant) => (
            <S.Banner key={variant}>
              <HomeBanner variant={variant} onClick={() => navigate('/problems/1287')} />
            </S.Banner>
          ))}
        </S.Section>
        <S.Section>
          <h2>Avatar / Profile</h2>
          <S.Row>
            <Avatar name={memberFixture.name} />
            <Avatar name={memberFixture.name} size={64} />
          </S.Row>
        </S.Section>
        <S.Section>
          <h2>Range Slider</h2>
          <S.Panel>
            <S.Range>
              <RangeSlider label="진행도 범위" value={range} onChange={setRange} />
              <output aria-live="polite">
                {range[0]} – {range[1]}
              </output>
            </S.Range>
          </S.Panel>
        </S.Section>
        <S.Section>
          <h2>Profile</h2>
          <ProfileCard member={memberFixture} onEdit={() => notify('프로필 수정')} />
          <S.Notice role="status">{notice}</S.Notice>
        </S.Section>
      </S.Main>
    </S.Root>
  );
}
