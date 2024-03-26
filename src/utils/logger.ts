import colors from 'picocolors';
const { green, red, cyan, yellow, white, bgBlack, bold } = colors;

export enum LogLevel {
    'success',
    'checkmark',
    'warn',
    'error',
    'command',
    'default',
}

export enum LogColor {
    'green',
    'red',
    'cyan',
    'yellow',
    'white',
    'default',
}

const useTextColor = (color: LogColor) => {
    switch (color) {
        case LogColor.green:
            return {
                enabled: true,
                paint: green,
            };
        case LogColor.red:
            return {
                enabled: true,
                paint: red,
            };
        case LogColor.cyan:
            return {
                enabled: true,
                paint: cyan,
            };
        case LogColor.yellow:
            return {
                enabled: true,
                paint: yellow,
            };
        case LogColor.white:
            return {
                enabled: true,
                paint: white,
            };
        default:
            return {
                enabled: false,
                paint: white,
            };
    }
};

export function log(
    text: string,
    level: LogLevel = LogLevel.default,
    color: LogColor = LogColor.default,
    prefixNewLine = false,
    suffixNewLine = false
) {
    const { enabled, paint } = useTextColor(color);
    if (enabled) {
        text = paint(text);
    }
    if (prefixNewLine) {
        console.log('');
    }
    switch (level) {
        case LogLevel.success:
            console.log(green('Success! ') + text);
            break;
        case LogLevel.checkmark:
            console.log(green('✔ ') + text);
            break;
        case LogLevel.warn:
            console.log(yellow('⚠ ') + text);
            break;
        case LogLevel.error:
            console.error(red(`✖ Error: ${text}`));
            break;
        case LogLevel.command:
            console.log(bgBlack(` ${bold(text)} `));
            break;
        case LogLevel.default:
            console.log(text);
            break;
    }
    if (suffixNewLine) {
        console.log('');
    }
}
