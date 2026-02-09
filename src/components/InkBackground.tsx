import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface RedEnvelope {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  sway: number;
}

interface InkBackgroundProps {
  isActive: boolean;
}

export function InkBackground({ isActive }: InkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 水墨粒子类
    class InkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      maxRadius: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 1;
        this.maxRadius = Math.random() * 50 + 30;
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius += 0.5;
        this.alpha -= 0.002;
        
        // 速度衰减
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      isDead(): boolean {
        return this.alpha <= 0 || this.radius >= this.maxRadius;
      }
    }

    let particles: InkParticle[] = [];
    let fireworks: Particle[] = [];
    let redEnvelopes: RedEnvelope[] = [];
    let animationId: number;

    // 创建水墨晕染效果
    const createInkSplash = (x: number, y: number, count: number = 30) => {
      for (let i = 0; i < count; i++) {
        particles.push(new InkParticle(x, y));
      }
    };

    // 创建烟花效果
    const createFirework = (x: number, y: number) => {
      const colors = ['#FF0000', '#FFD700', '#FF6B00', '#FF1493', '#FFA500'];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 3 + 2;
        
        fireworks.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2
        });
      }
    };

    // 创建飘落的红包
    const createRedEnvelope = () => {
      if (redEnvelopes.length < 5) {
        redEnvelopes.push({
          x: Math.random() * canvas.width,
          y: -50,
          rotation: Math.random() * Math.PI * 2,
          speed: Math.random() * 1 + 0.5,
          sway: Math.random() * 2 - 1
        });
      }
    };

    // 绘制红包
    const drawRedEnvelope = (envelope: RedEnvelope) => {
      ctx.save();
      ctx.translate(envelope.x, envelope.y);
      ctx.rotate(envelope.rotation);
      
      // 红包主体
      ctx.fillStyle = '#D32F2F';
      ctx.fillRect(-15, -20, 30, 40);
      
      // 金色装饰
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(-12, -17, 24, 3);
      ctx.fillRect(-12, 14, 24, 3);
      
      // 福字
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 16px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('福', 0, 0);
      
      ctx.restore();
    };

    // 动画循环
    const animate = () => {
      // 半透明背景，创建拖尾效果
      ctx.fillStyle = 'rgba(255, 245, 235, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 更新和绘制水墨粒子
      particles = particles.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return !particle.isDead();
      });

      // 更新和绘制烟花
      fireworks = fireworks.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // 重力
        particle.life -= 0.01;
        
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        return particle.life > 0;
      });

      // 更新和绘制红包
      redEnvelopes = redEnvelopes.filter(envelope => {
        envelope.y += envelope.speed;
        envelope.x += Math.sin(envelope.y * 0.01) * envelope.sway;
        envelope.rotation += 0.02;
        
        drawRedEnvelope(envelope);
        
        return envelope.y < canvas.height + 50;
      });

      // 随机生成新的效果
      if (isActive) {
        // 水墨效果
        if (Math.random() < 0.02) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          createInkSplash(x, y, 15);
        }
        
        // 烟花效果
        if (Math.random() < 0.01) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height * 0.5);
          createFirework(x, y);
        }
        
        // 红包飘落
        if (Math.random() < 0.02) {
          createRedEnvelope();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // 初始效果
    if (isActive) {
      createInkSplash(canvas.width / 2, canvas.height / 2, 50);
      
      // 添加多个初始水墨点
      setTimeout(() => {
        createInkSplash(canvas.width * 0.3, canvas.height * 0.3, 30);
      }, 200);
      setTimeout(() => {
        createInkSplash(canvas.width * 0.7, canvas.height * 0.6, 30);
      }, 400);
      
      // 初始烟花
      setTimeout(() => {
        createFirework(canvas.width * 0.3, canvas.height * 0.2);
      }, 600);
      setTimeout(() => {
        createFirework(canvas.width * 0.7, canvas.height * 0.3);
      }, 1000);
    }

    // 鼠标移动时创建水墨和烟花效果
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) {
        if (Math.random() < 0.1) {
          createInkSplash(e.clientX, e.clientY, 10);
        }
        if (Math.random() < 0.03) {
          createFirework(e.clientX, e.clientY);
        }
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
