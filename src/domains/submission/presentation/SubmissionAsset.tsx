interface SubmissionAssetProps {
  name: string;
}

export function SubmissionAsset({ name }: SubmissionAssetProps) {
  return <img src={`/images/submission/${name}.svg`} alt="" />;
}
