import styled from "styled-components";
import { Link, } from "react-router-dom";
import { compose, withState, withHandlers, } from "recompose";

import * as mixins from "../../style/mixins";
import * as vars from "../../style/vars";
import { objMap, } from "src/lib/util";

import Links from "./Links";
import Burger from "./Burger";
import Fade from "../Fade";

import data from "src/data";

// --------------------------------------------------

const Wrapper = styled.nav`
	background-color: ${R.path([ "theme", "nav", ])};
	z-index: 3;
`;

const Inner = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const MobileStuff = styled.div`
	${ mixins.bp.sm.min`display: none;`} ${mixins.contained()};
`;

const Dark = styled.div`
	${ mixins.contained() } position: fixed;
	background: ${mixins.tr(0.5)};
`;

const Overlay = styled.div`
	${ mixins.contained() } ${({ open, }) =>
	open ? mixins.shadow(1) : ""} transition: 0.3s all ease-out;
	background-color: ${R.path([ "theme", "nav", ])};
`;

const BurgerWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 50%;
	margin-top: -20px;
`;

const LogoText = styled.div`
	font-size: 2em;
	font-family: ${vars.font.title.family};
	color: ${R.path([ "theme", "logo1", ])};
	text-transform: uppercase;
	padding-top: 1.5em;

	&:after {
		padding: 0.05em 0;
		content: '';
		display: block;
		width: 5em;
		border-bottom: 0.2em solid ${ vars.colors.bgdark };
	}
`;

const LogoImage = styled.img`
	height: 80%;
	width: auto;
`;

const Logo = props =>
	<LogoWrapper to = "/">
		{
			data.siteTitle
			? <LogoText>{ data.siteTitle }</LogoText>
			: <LogoImage src = "/img/logo.png"/>
		}
	</LogoWrapper>;

const IndexLink = props => <Link to = "/" { ...props } />;

const LogoWrapper = styled(IndexLink)`
	position: absolute;
	top: 0;
	bottom: 0;
	${ mixins.bpEither("left", vars.dim.nav.margin )}
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-bottom: 1.5em;
`;

// --------------------------------------------------

const enhance = compose(
	withState("open", "setOpen", false),
	withHandlers({
		openMenu: ({ setOpen, }) => () => setOpen(true),
		closeMenu: ({ setOpen, }) => () => setOpen(false),
		toggleMenu: ({ setOpen, open, }) => () => setOpen(!open),
	})
);

const Nav = ({ open, closeMenu, toggleMenu, }) => (
	<Wrapper>
		<Inner>
			<MobileStuff>
				<Fade visible = { open }>
					<Dark onClick = { closeMenu }/>
				</Fade>
			</MobileStuff>

			<Links
				close = { closeMenu }
				open = { open }
			/>

			<MobileStuff>
				<Overlay open = { open }/>
				
				<BurgerWrapper onClick = { toggleMenu }>
					<Burger
						open = { open }
						padding = { mixins.num(vars.dim.nav.margin.xs) }
						color = { vars.colors.text }
					/>
				</BurgerWrapper>
			</MobileStuff>
			
			<Logo />
		</Inner>
	</Wrapper>
);

export default enhance(Nav);
