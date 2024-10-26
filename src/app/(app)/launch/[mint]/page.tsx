import LaunchDetailView from '@/views/LaunchDetailView';

export default function LaunchDetail({ params }: { params: { mint: string } }) {
  return <LaunchDetailView mint={params.mint} />;
}
