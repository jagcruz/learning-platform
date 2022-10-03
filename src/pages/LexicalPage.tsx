import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import LexicalEditor from 'src/components/LexicalRichEditor';

const LexicalPage: FC = () => {
    const [debug, setDebug] = useState(false);
    return (
        <Box>
            <Typography variant='h3'>Material Rich Text Editor</Typography>

            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={debug}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setDebug(event.target.checked)
                            }
                        />
                    }
                    label='Debug'
                />
            </FormGroup>

            <LexicalEditor namespace='MaterialRich' debug={debug} />

            <Box className='other'>
                <Typography variant='overline'>Other Examples</Typography>

                <Box component='ul'>
                    <Box component='li'>
                        <Typography
                            component='a'
                            href='https://codesandbox.io/s/lexical-rich-text-example-5tncvy'
                        >
                            Rich Text Editor Official Example
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LexicalPage;
