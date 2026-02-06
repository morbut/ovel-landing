import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import posthog from 'posthog-js';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  Layout, 
  Users,
  CheckCircle2,
  X,
  ArrowRight
} from 'lucide-react';

// Initialize PostHog (Placeholders)
if (typeof window !== 'undefined') {
  posthog.init('phc_placeholder_key', {
    api_host: 'https://app.posthog.com',
    autocapture: true,
    capture_pageview: true,
  });
}

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6366F1;
    --primary-hover: #4F46E5;
    --bg: #FFFFFF;
    --surface: #F8FAFC;
    --text-main: #0F172A;
    --text-muted: #64748B;
    --border: #E2E8F0;
  }

  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg);
    color: var(--text-main);
    overflow-x: hidden;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 5%;
  max-width: 1400px;
  margin: 0 auto;
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 900; font-size: 18px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 768px) { display: none; }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s;
  &:hover { color: var(--primary); }
`;

const PrimaryBtn = styled.button<{ $small?: boolean; $outline?: boolean }>`
  background-color: ${p => p.$outline ? 'transparent' : 'var(--primary)'};
  color: ${p => p.$outline ? 'var(--text-main)' : 'white'};
  border: ${p => p.$outline ? '1px solid var(--border)' : 'none'};
  padding: ${p => p.$small ? '10px 20px' : '16px 32px'};
  border-radius: 12px;
  font-weight: 600;
  font-size: ${p => p.$small ? '14px' : '16px'};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${p => p.$outline ? 'var(--surface)' : 'var(--primary-hover)'};
    transform: translateY(-2px);
    box-shadow: ${p => p.$outline ? 'none' : '0 10px 20px -5px rgba(99, 102, 241, 0.4)'};
  }
`;

const HeroSection = styled.section`
  padding: 180px 5% 100px;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 140px;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  @media (max-width: 1024px) { margin: 0 auto; }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: #EEF2FF;
  color: #6366F1;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 64px;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -2px;

  span {
    background: linear-gradient(90deg, #6366F1 0%, #A855F7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) { font-size: 48px; }
`;

const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 40px;
`;

const HeroImageContainer = styled(motion.div)`
  position: relative;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 12px;
  overflow: hidden;
`;

const AppMockup = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
`;

const FeatureSection = styled.section`
  padding: 100px 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
  @media (max-width: 640px) { margin-bottom: 40px; }
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
  @media (max-width: 640px) { font-size: 32px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled.div`
  padding: 40px;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div`
  width: 48px; height: 48px;
  border-radius: 12px;
  background: white;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  margin-bottom: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const FeatureDesc = styled.p`
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 16px;
`;

const PricingSection = styled.section`
  padding: 100px 5%;
  background-color: var(--surface);
  border-top: 1px solid var(--border);
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1024px) { grid-template-columns: 1fr; max-width: 500px; }
`;

const PricingCard = styled.div<{ $featured?: boolean }>`
  padding: 48px 40px;
  background: white;
  border-radius: 24px;
  border: 2px solid ${p => p.$featured ? 'var(--primary)' : 'var(--border)'};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-8px); }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Price = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin: 24px 0 8px;
  span { font-size: 16px; color: var(--text-muted); font-weight: 500; }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--text-muted);
  font-size: 15px;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 48px;
  border-radius: 32px;
  max-width: 540px;
  width: 100%;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px; right: 24px;
  background: var(--surface);
  border: none;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  &:hover { color: var(--text-main); background: var(--border); }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
`;

const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: var(--primary); }
`;

const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 16px;
  outline: none;
  background: white;
  appearance: none;
  cursor: pointer;
`;

const SuccessState = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const Footer = styled.footer`
  padding: 80px 5% 40px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleOpenModal = (source: string) => {
    posthog.capture('open_waitlist_modal', { source });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    // Capture data in PostHog
    posthog.capture('waitlist_signup', data);
    posthog.identify(data.email as string, {
      role: data.role,
      teamSize: data.teamSize,
      source: 'landing_page'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <Logo onClick={() => window.scrollTo(0, 0)}>
          <LogoIcon>O</LogoIcon>
          OVEL
        </Logo>
        <NavLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
        </NavLinks>
        <div style={{ display: 'flex', gap: '12px' }}>
          <NavLink href="#" onClick={() => handleOpenModal('nav_signin')} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>Sign In</NavLink>
          <PrimaryBtn $small onClick={() => handleOpenModal('nav_get_started')}>Get Started</PrimaryBtn>
        </div>
      </Navbar>

      <HeroSection>
        <HeroContent>
          <Badge>
            <Zap size={14} />
            <span>Now in Private Beta for Jira Cloud</span>
          </Badge>
          <Title>
            Sprint Planning that stays <span>OVEL</span> the noise.
          </Title>
          <Subtitle>
            The high-performance planning layer for Jira. Model capacity, 
            link strategic roadmaps, and ship faster—without the Jira lag.
          </Subtitle>
          <div style={{ display: 'flex', gap: '12px' }}>
            <PrimaryBtn onClick={() => handleOpenModal('hero_cta')}>
              Get Early Access
              <ChevronRight size={18} />
            </PrimaryBtn>
            <PrimaryBtn $outline onClick={() => document.getElementById('features')?.scrollIntoView()}>
              View Features
            </PrimaryBtn>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B' }}>
              <CheckCircle2 size={16} color="#10B981" />
              Jira Integrated
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B' }}>
              <CheckCircle2 size={16} color="#10B981" />
              Zero-Knowledge Privacy
            </div>
          </div>
        </HeroContent>

        <HeroImageContainer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AppMockup src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="OVEL Dashboard" />
        </HeroImageContainer>
      </HeroSection>

      <FeatureSection id="features">
        <SectionHeader>
          <SectionTitle>Built for Engineering Teams that ship with velocity.</SectionTitle>
          <Subtitle>OVEL sits on top of your existing Jira instance, giving you the power to plan without the noise.</Subtitle>
        </SectionHeader>

        <Grid>
          <FeatureCard>
            <IconWrapper><Layout /></IconWrapper>
            <FeatureTitle>Virtual Sandbox</FeatureTitle>
            <FeatureDesc>Draft your next 3 sprints in a risk-free environment. Model different scenarios and commit to Jira only when your plan is solid.</FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><Users /></IconWrapper>
            <FeatureTitle>Live Capacity Hub</FeatureTitle>
            <FeatureDesc>Stop guessing. OVEL automatically calculates team bandwidth based on individual velocity, vacations, and support rotations.</FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><Target /></IconWrapper>
            <FeatureTitle>Strategic Alignment</FeatureTitle>
            <FeatureDesc>Directly link every sprint ticket to high-level quarterly initiatives. Ensure your daily execution maps to your strategic goals.</FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><Zap /></IconWrapper>
            <FeatureTitle>Force Multiplier</FeatureTitle>
            <FeatureDesc>AI-assisted auto-planning surfaces the most important work and assigns it based on team expertise and current load.</FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><Layers /></IconWrapper>
            <FeatureTitle>Quality Pillars</FeatureTitle>
            <FeatureDesc>Visualize Technical Debt, Security patches, and Overdue items in a single dashboard. Never lose track of product health.</FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><ShieldCheck /></IconWrapper>
            <FeatureTitle>Zero-Knowledge Privacy</FeatureTitle>
            <FeatureDesc>Your data, your keys. Jira content stays in your browser. We never store your tickets or credentials on our servers.</FeatureDesc>
          </FeatureCard>
        </Grid>
      </FeatureSection>

      <PricingSection id="pricing">
        <SectionHeader>
          <SectionTitle>Simple, scale-ready pricing.</SectionTitle>
          <Subtitle>Choose the plan that fits your team's velocity.</Subtitle>
        </SectionHeader>
        <PricingGrid>
          <PricingCard>
            <FeatureTitle>Starter</FeatureTitle>
            <Price>$0<span>/mo</span></Price>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Perfect for small teams and side projects.</p>
            <FeatureList>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> 1 Team</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Basic Planning</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Local Storage</FeatureItem>
            </FeatureList>
            <PrimaryBtn $small $outline style={{ width: '100%' }} onClick={() => handleOpenModal('pricing_starter')}>Get Started</PrimaryBtn>
          </PricingCard>

          <PricingCard $featured>
            <FeaturedBadge>Most Popular</FeaturedBadge>
            <FeatureTitle>Pro</FeatureTitle>
            <Price>$10<span>/user/mo</span></Price>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Advanced features for scaling engineering orgs.</p>
            <FeatureList>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Unlimited Teams</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> AI Auto-Plan</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Strategic Roadmap</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Cloud Sync</FeatureItem>
            </FeatureList>
            <PrimaryBtn $small style={{ width: '100%' }} onClick={() => handleOpenModal('pricing_pro')}>Start 14-day Trial</PrimaryBtn>
          </PricingCard>

          <PricingCard>
            <FeatureTitle>Enterprise</FeatureTitle>
            <Price>Custom</Price>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Security and support for large organizations.</p>
            <FeatureList>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> SSO (SAML/OIDC)</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Advanced Security</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Priority Support</FeatureItem>
              <FeatureItem><CheckCircle2 size={16} color="var(--primary)" /> Custom Contracts</FeatureItem>
            </FeatureList>
            <PrimaryBtn $small $outline style={{ width: '100%' }} onClick={() => handleOpenModal('pricing_enterprise')}>Contact Sales</PrimaryBtn>
          </PricingCard>
        </PricingGrid>
      </PricingSection>

      <Footer>
        <Logo onClick={() => window.scrollTo(0, 0)}>
          <LogoIcon>O</LogoIcon>
          OVEL
        </Logo>
        <div style={{ display: 'flex', gap: '40px' }}>
          <NavLink href="#">Twitter</NavLink>
          <NavLink href="#">LinkedIn</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#">Privacy Policy</NavLink>
        </div>
        <div style={{ color: '#94A3B8', fontSize: '14px' }}>
          © 2026 OVEL. All rights reserved.
        </div>
      </Footer>

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseBtn onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </CloseBtn>

              {!isSubmitted ? (
                <>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', background: '#EEF2FF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 24px' }}>
                      <Zap size={32} fill="currentColor" />
                    </div>
                    <SectionTitle style={{ fontSize: '32px', marginBottom: '12px' }}>Join the OVEL Beta</SectionTitle>
                    <p style={{ color: 'var(--text-muted)' }}>Experience high-performance planning for Jira. We'll reach out once your spot is ready.</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <InputGroup>
                      <Label>Work Email</Label>
                      <Input name="email" type="email" placeholder="sarah@techflow.io" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                      <Label>Your Role</Label>
                      <Select name="role" required>
                        <option value="">Select your role</option>
                        <option value="eng_manager">Engineering Manager</option>
                        <option value="scrum_master">Scrum Master</option>
                        <option value="cto">CTO / VP Engineering</option>
                        <option value="pm">Product Manager</option>
                        <option value="dev">Developer</option>
                      </Select>
                    </InputGroup>
                    <InputGroup>
                      <Label>Engineering Team Size</Label>
                      <Select name="teamSize" required>
                        <option value="">Select size</option>
                        <option value="1-10">1 - 10 developers</option>
                        <option value="11-50">11 - 50 developers</option>
                        <option value="51-200">51 - 200 developers</option>
                        <option value="200+">200+ developers</option>
                      </Select>
                    </InputGroup>
                    <PrimaryBtn type="submit" style={{ marginTop: '12px' }}>
                      Get Early Access
                      <ArrowRight size={18} />
                    </PrimaryBtn>
                  </Form>
                </>
              ) : (
                <SuccessState>
                  <div style={{ width: '64px', height: '64px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 24px' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <SectionTitle style={{ fontSize: '32px', marginBottom: '12px' }}>You're on the list!</SectionTitle>
                  <p style={{ color: 'var(--text-muted)' }}>Thanks for your interest. We'll be in touch with {email} soon.</p>
                </SuccessState>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
