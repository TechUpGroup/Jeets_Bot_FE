import ExchangeDetailView from '@/views/ExchangeDetailView';

export default function ExchangeDetail({ params }: { params: { mint: string } }) {
  return <ExchangeDetailView mint={params.mint} />;
}
