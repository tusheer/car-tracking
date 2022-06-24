import { useState } from 'react';
import { Button } from 'ui';
import { User } from 'types';

export default function Docs() {
    const [state, setState] = useState<User>();
    return (
        <div>
            <h1>Docs</h1>
            <Button />
        </div>
    );
}
