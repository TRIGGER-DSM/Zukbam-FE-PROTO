import { Image } from '../../../shared/ui/Image';

interface SubmissionAssetProps {
  name: string;
}

export function SubmissionAsset({ name }: SubmissionAssetProps) {
  return <Image src={`/images/submission/${name}.svg`} alt="" />;
}
