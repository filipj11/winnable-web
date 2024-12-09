import styles from "./tooltip.module.css";

export type InteractionInfo = {
    xPos: number;
    yPos: number;
    text: string;
};

type TooltipProps = {
    interactionInfo: InteractionInfo | null;
}

export const Tooltip = ({ interactionInfo }: TooltipProps) => {
    if (!interactionInfo) {
        return null;
    }

    return (
        <div
            className={styles.tooltip}
            style={{
                left: interactionInfo.xPos,
                top: interactionInfo.yPos,
            }}
        >
            {interactionInfo.text}
        </div>
    );
};