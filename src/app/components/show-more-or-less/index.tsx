import {Button} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import {useTranslations} from "use-intl";

export default function ShowMoreOrLess({show, callback}: {
    show: boolean,
    callback: () => void
}) {
    const buttonTranslations = useTranslations('Buttons');

    return (
        <Box css={{pt: "30px"}}>
            <Button
                css={{m: "0 auto"}}
                onPress={callback}
            >
                {show ? buttonTranslations('showLess') : buttonTranslations('showMore')}
            </Button>
        </Box>
    )
}
