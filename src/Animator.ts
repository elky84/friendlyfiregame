import { Entity } from './Entity';
import { Aseprite } from './Aseprite';
import { RenderingLayer } from './Renderer';

export type AnimationConfig = {
  playUntilFinished?: boolean;
}

export type CurrentAnimationState = {
  tag: string;
  start: number;
  finished: boolean;
  duration?: number;
  config?: AnimationConfig;
  direction?: number;
}

/**
 * The Animator class can be used to orchestrate and draw aseprite animations of an entity
 */
export class Animator {
  private entity: Entity;
  private sprite?: Aseprite;
  private time: number = 0;

  private currentAnimation: CurrentAnimationState = {
    tag: '',
    start: 0,
    duration: 0,
    direction: 1,
    finished: false
  }

  public constructor (entity: Entity) {
    this.entity = entity;
  }

  public assignSprite (sprite: Aseprite): void {
    this.sprite = sprite;
  }

  /**
   * Updates the animation if all conditions are met regarding the currently playing animation.
   * 
   * @param tag    - The animation tag to draw.
   * @param config - Optional animation configuration.
   */
  private updateAnimation (tag: string, config?: AnimationConfig) {
    // Early out if animation tag is already set as current animation
    if (!this.sprite) return;
    if (this.currentAnimation.tag === tag) return;

    // If current animation has a fixed duration, check if it was reached.
    // If so, the animation is set to finished.
    if (this.currentAnimation.duration) {
      const animationTime = this.time - this.currentAnimation.start;
      if (animationTime >= this.currentAnimation.duration) {
         this.currentAnimation.finished = true;
      }
    }

    if (!this.currentAnimation.duration || this.currentAnimation.finished) {
      this.currentAnimation.tag = tag;
      this.currentAnimation.start = this.entity.scene.gameTime * 1000;
      this.currentAnimation.config = config;
      this.currentAnimation.finished = false;
      this.currentAnimation.duration = config?.playUntilFinished ? this.sprite.getAnimationDurationByTag(tag) : 0;
    }
  }

  /**
   * Method to call from draw method of the entity to draw a specific animation by tag.
   *
   * @param tag    - The animation tag to draw.
   * @param ctx    - The canvas context to draw to.
   * @param config - Optional animation configuration.
   */
  public play (tag: string, direction: number, config?: AnimationConfig) {
    this.time = (this.entity.scene.gameTime * 1000);
    this.currentAnimation.direction = direction;
    this.updateAnimation(tag, config);
    this.draw(this.time - this.currentAnimation.start);
  }

  private draw (animationTime: number): void {
    if (this.sprite) {
      this.entity.scene.renderer.addAseprite(
        this.sprite, this.currentAnimation.tag, this.entity.x, this.entity.y, RenderingLayer.ENTITIES, this.currentAnimation.direction, animationTime
      )
    }
  }
}