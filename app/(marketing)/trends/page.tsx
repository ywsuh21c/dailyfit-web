import { redirect } from 'next/navigation';

// Option-B IA: /trends index is deprecated — thought-leadership lives at
// /writing. Individual /trends/[slug] posts (Sanity) keep their template
// when CMS lands. TODO(phase-3): move to a permanent redirect in next.config.
export default function TrendsPage() {
  redirect('/writing');
}
