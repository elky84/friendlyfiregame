import { Dialog, Message } from "./Dialog";
import { NPC } from './NPC';
import { SpeechBubble } from "./SpeechBubble";
import { entity } from "./Entity";
import { Game } from "./game";
import { ScriptedDialog } from './ScriptedDialog';
import dialogData from "../assets/dummy.texts.json";

@entity("stone")
@entity("tree")
export class DummyNPC extends NPC {
    private activeDialog: Dialog | null = null;
    public activeSpeechBubble: SpeechBubble | null = null;

    public constructor(game: Game, x: number, y:number) {
        super(game, x, y, 20, 30);
        this.scriptedDialog = new ScriptedDialog(this, dialogData);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.strokeText("NPC", this.x - (this.width / 2), -this.y - this.height);
        ctx.strokeRect(this.x - (this.width / 2), -this.y - this.height, this.width, this.height);
        ctx.restore();
        this.drawDialog(ctx);
    }

    update(dt: number): void {
        this.updateDialog(dt);
    }

    startDialog(): void {
        if (this.hasDialog && !this.activeDialog) {
            const someConversation: Array<Message> = [
                { entity: "player", text: "Hello block.\nDo you have a task for me?" },
                {
                    entity: "other", text: "Sure, Player 1. What do you want to do?",
                    actionPaths: new Map<string, Array<Message>>()
                        .set("Epic shit", [
                            { entity: "other", text: "Hell yeah we will rock this." },
                            { entity: "player", text: "Then let's get the party started." }
                        ])
                        .set("Lame shit", [
                            { entity: "other", text: "Okay. Yeah. Stop playing this game, bitch." },
                            { entity: "player", text: "Ok." }
                        ])
                },
                { entity: "player", text: "Sure." },
                { entity: "other", text: "You ready?" },
                { entity: "player", text: "Sure." },
                { entity: "other", text: "Thanks for your help." },
                { entity: "player", text: "You're welcome." },
                { entity: "other", text: "Bye." },
            ]
            this.activeDialog = new Dialog(someConversation, this.game.player, this);
            this.getNextConversationPart();
        } else if (this.activeDialog) {
            this.getNextConversationPart();
        }
    }

    getNextConversationPart(): void {
        if (this.activeDialog && this.activeDialog.getNextMessage()) {
            this.activeSpeechBubble = this.activeDialog.getSpeechBubbleForEntity();
            this.game.player.activeSpeechBubble = this.activeDialog.getSpeechBubbleForPlayer();
            this.game.player.isInDialog = true;
        } else {
            // this.closeAllTexts();
        }
    }
}
