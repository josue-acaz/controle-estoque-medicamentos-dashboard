import styled from "styled-components";
import {EnumAppColors} from "../../constants";

const SignInView = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        padding-left: 15px;
        padding-right: 15px;
    }
`;

const SignInContent = styled.div`
    height: auto;
    width: 500px;
    background-color: #ffffff;
    border-radius: 0px;
    padding: 1rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Footer = styled.div`
    margin-top: 10px;
`;

const Logo = styled.img`
    width: 300px;
    height: 85px;
    object-fit: cover;
`;

const ForgotPasswordLink = styled.a`
    font-size: 14px;
    color: #444444;
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: ${EnumAppColors.PRIMARY};
`;

const Subtitle = styled.p`
    font-size: 18px;
    font-weight: normal;
    color: #666666;
`;

export {
    SignInView, 
    SignInContent, 
    Header,
    Logo,
    Footer,
    Title,
    Subtitle,
    ForgotPasswordLink,
};