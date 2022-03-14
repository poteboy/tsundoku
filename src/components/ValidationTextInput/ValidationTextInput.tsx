import { MaterialIcons } from '@expo/vector-icons';
import { Input, IInputProps, Box, Text, Pressable, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';

import { Spacer } from '@src/components';
import { colors } from '@src/styles';

export type ValidationInputProps<T extends FieldValues> = IInputProps &
  UseControllerProps<T> & {
    error?: boolean;
    testID?: string;
    label?: string;
    isPassword?: boolean;
    variant?: string;
    defaultValue?: string;
    onChangeText?: (text: string) => void;
  };

export const ValidationInput = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  defaultValue,
  placeholder,
  variant,
  isPassword,
  onFocus,
  onChangeText,
  ...styles
}: ValidationInputProps<T>) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPassword);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (defaultValue) setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur }, formState: { errors } }) => {
        const isValid = !errors[name]?.message;
        return (
          <Box width="100%">
            {label && (
              <>
                <Text variant="body2">{label.trim()}</Text>
                <Spacer size={8} />
              </>
            )}
            <Input
              {...styles}
              {...control?.register(name)}
              variant={variant}
              borderWidth="1px"
              borderRadius={4}
              placeholder={placeholder}
              value={inputValue}
              fontSize={16}
              onBlur={onBlur}
              isInvalid={!isValid}
              onChangeText={values => {
                onChange(values);
                onChangeText && onChangeText(values);
                setInputValue(values);
              }}
              secureTextEntry={isSecureTextEntry}
              onFocus={onFocus}
            />
            {!isValid && (
              <>
                <Spacer size={8} />
                <Text variant="body2" color={colors.error}>
                  {errors[name]?.message}
                </Text>
              </>
            )}
          </Box>
        );
      }}
    />
  );
};
