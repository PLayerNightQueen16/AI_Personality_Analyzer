import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="max-w-md">
      <ProgressBar current={3} total={10} />
    </div>
  );
}
