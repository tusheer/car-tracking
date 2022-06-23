import { useState } from 'react';
import { Button } from 'ui';

export default function Docs() {
    console.log('ji');
    const [state, setState] = useState('false');

    return (
        <div>
            <h1>Docs</h1>
            <Button />
        </div>
    );
}
