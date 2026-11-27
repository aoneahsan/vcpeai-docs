import React from 'react';
import OriginalFooter from '@theme-original/Footer';
import Showcase from '../../components/ecosystem/Showcase';

export default function Footer(props: React.ComponentProps<typeof OriginalFooter>): React.JSX.Element {
  return <><Showcase /><OriginalFooter {...props} /></>;
}
