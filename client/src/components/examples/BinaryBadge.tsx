import BinaryBadge from '../BinaryBadge';

export default function BinaryBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <BinaryBadge code="101" meaning="confident" />
      <BinaryBadge code="011" meaning="mysterious" />
      <BinaryBadge code="110" meaning="creative" variant="outline" />
    </div>
  );
}
