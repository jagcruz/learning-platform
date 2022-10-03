import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getCodeLanguages } from '@lexical/code';

import type { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function SelectLang({ onChange, className, options, value }) {
    return (
        <select className={className} onChange={onChange} value={value}>
            <option hidden={true} value='' />
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

interface CodeLangSelectorProps {
    codeLanguage: string;
    onChange: (event: SelectChangeEvent) => void;
}

const CodeLangSelector: FC<CodeLangSelectorProps> = ({ codeLanguage, onChange }) => {
    const { t } = useTranslation();
    const codeLanguages = useMemo(() => getCodeLanguages(), []);

    return (
        <FormControl fullWidth size='small'>
            <InputLabel id='code-lang-select-label' sx={{ fontSize: '0.8rem' }}>
                {t('Code Language')}
            </InputLabel>

            <Select
                labelId='code-lang-select-label'
                id='code-lang-select'
                label={t('Code Language')}
                value={codeLanguage}
                onChange={onChange}
                MenuProps={{ sx: { maxHeight: 300 } }}
                inputProps={{
                    sx: { textTransform: 'capitalize', fontSize: '0.8rem' }
                }}
                sx={{ fontSize: '0.8rem' }}
            >
                <MenuItem value='' hidden sx={{ display: 'none' }} />

                {codeLanguages.map((option) => (
                    <MenuItem
                        key={`code-lang-${option}`}
                        value={option}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CodeLangSelector;
